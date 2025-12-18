import { supabase } from "./supabase";

export interface AboutPageContent {
  id: number;
  section_type: "hero" | "story" | "stats" | "vision" | "mission" | "values" | "cta";
  section_name: string;
  content: Record<string, any>;
  is_published: boolean;
  version: number;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  published_at?: string;
  created_by?: string;
  updated_by?: string;
  notes?: string;
}

export interface AboutPageRevision {
  id: number;
  content_id: number;
  section_type: string;
  old_content: Record<string, any>;
  new_content: Record<string, any>;
  change_summary: string;
  change_type: "create" | "update" | "delete" | "publish";
  changed_by: string;
  changed_at: string;
  reason?: string;
}

export interface AboutPageSettings {
  id: number;
  auto_publish: boolean;
  draft_enabled: boolean;
  show_version_history: boolean;
  last_published_at?: string;
  last_published_by?: string;
  theme_color: string;
  feature_draft: boolean;
  feature_schedule: boolean;
  feature_preview: boolean;
  updated_at: string;
  updated_by?: string;
}

class AboutPageService {
  // ============================================
  // FETCH CONTENT
  // ============================================
  async getAllContent(): Promise<AboutPageContent[]> {
    const { data, error } = await supabase
      .from("about_page_content")
      .select("*")
      .order("section_type", { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async getContentBySection(
    section_type: string
  ): Promise<AboutPageContent | null> {
    const { data, error } = await supabase
      .from("about_page_content")
      .select("*")
      .eq("section_type", section_type)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  }

  async getPublishedContent(): Promise<AboutPageContent[]> {
    const { data, error } = await supabase
      .from("about_page_content")
      .select("*")
      .eq("is_published", true)
      .order("section_type", { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // ============================================
  // CREATE / UPDATE CONTENT
  // ============================================
  async updateContent(
    id: number,
    content: Record<string, any>,
    reason?: string,
    author?: string
  ): Promise<AboutPageContent> {
    // Get old content for revision
    const oldData = await this.getContentById(id);

    const { data, error } = await supabase
      .from("about_page_content")
      .update({
        content,
        updated_at: new Date().toISOString(),
        updated_by: author || "admin",
        status: "draft",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // Create revision record
    if (oldData) {
      await this.createRevision({
        content_id: id,
        section_type: oldData.section_type,
        old_content: oldData.content,
        new_content: content,
        change_summary: `Updated ${oldData.section_name}`,
        change_type: "update",
        changed_by: author || "admin",
        reason,
      });
    }

    return data;
  }

  async getContentById(id: number): Promise<AboutPageContent | null> {
    const { data, error } = await supabase
      .from("about_page_content")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  }

  // ============================================
  // PUBLISH / UNPUBLISH
  // ============================================
  async publishContent(id: number, author?: string): Promise<AboutPageContent> {
    const { data, error } = await supabase
      .from("about_page_content")
      .update({
        is_published: true,
        status: "published",
        published_at: new Date().toISOString(),
        updated_by: author || "admin",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    // Create revision record
    await this.createRevision({
      content_id: id,
      section_type: data.section_type,
      old_content: null,
      new_content: data.content,
      change_summary: `Published ${data.section_name}`,
      change_type: "publish",
      changed_by: author || "admin",
    });

    return data;
  }

  async unpublishContent(id: number, author?: string): Promise<AboutPageContent> {
    const { data, error } = await supabase
      .from("about_page_content")
      .update({
        is_published: false,
        status: "draft",
        updated_by: author || "admin",
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ============================================
  // REVISIONS & VERSION HISTORY
  // ============================================
  async createRevision(revision: Omit<AboutPageRevision, "id" | "changed_at">) {
    const { error } = await supabase
      .from("about_page_revisions")
      .insert([revision]);

    if (error) throw error;
  }

  async getRevisionHistory(contentId: number): Promise<AboutPageRevision[]> {
    const { data, error } = await supabase
      .from("about_page_revisions")
      .select("*")
      .eq("content_id", contentId)
      .order("changed_at", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async revertToRevision(
    contentId: number,
    revisionId: number,
    author?: string
  ): Promise<AboutPageContent> {
    // Get the revision to restore
    const { data: revision, error: revError } = await supabase
      .from("about_page_revisions")
      .select("*")
      .eq("id", revisionId)
      .single();

    if (revError) throw revError;

    // Update content with the old content
    return this.updateContent(
      contentId,
      revision.new_content,
      `Reverted to previous version (revision #${revisionId})`,
      author
    );
  }

  // ============================================
  // SETTINGS
  // ============================================
  async getSettings(): Promise<AboutPageSettings> {
    const { data, error } = await supabase
      .from("about_page_settings")
      .select("*")
      .single();

    if (error && error.code === "PGRST116") {
      // Create default settings if not exists
      return this.createDefaultSettings();
    }

    if (error) throw error;
    return data;
  }

  async updateSettings(
    settings: Partial<AboutPageSettings>,
    author?: string
  ): Promise<AboutPageSettings> {
    const { data, error } = await supabase
      .from("about_page_settings")
      .update({
        ...settings,
        updated_by: author || "admin",
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private async createDefaultSettings(): Promise<AboutPageSettings> {
    const { data, error } = await supabase
      .from("about_page_settings")
      .insert([
        {
          auto_publish: false,
          draft_enabled: true,
          show_version_history: true,
          theme_color: "navy",
          feature_draft: true,
          feature_schedule: true,
          feature_preview: true,
          updated_by: "admin",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ============================================
  // UTILITY
  // ============================================
  async compareRevisions(
    currentContent: Record<string, any>,
    revisionContent: Record<string, any>
  ) {
    return {
      current: currentContent,
      revision: revisionContent,
      changes: this.getDifferences(currentContent, revisionContent),
    };
  }

  private getDifferences(obj1: any, obj2: any): string[] {
    const diffs: string[] = [];
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    keys.forEach((key) => {
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        diffs.push(`${key}: "${obj1[key]}" → "${obj2[key]}"`);
      }
    });

    return diffs;
  }

  async exportContent(): Promise<string> {
    const content = await this.getAllContent();
    return JSON.stringify(content, null, 2);
  }

  async importContent(jsonContent: string, author?: string): Promise<void> {
    try {
      const data = JSON.parse(jsonContent);
      if (!Array.isArray(data)) throw new Error("Invalid format");

      for (const item of data) {
        const { id, section_type, ...rest } = item;
        if (id) {
          await this.updateContent(id, rest.content, "Imported content", author);
        }
      }
    } catch (error) {
      throw new Error(`Import failed: ${error}`);
    }
  }
}

export const aboutPageService = new AboutPageService();
