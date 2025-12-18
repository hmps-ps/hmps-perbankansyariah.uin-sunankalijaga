import { useState, useEffect } from "react";
import {
  aboutPageService,
  AboutPageContent,
  AboutPageRevision,
  AboutPageSettings,
} from "@/lib/about-page-service";
import { toast } from "sonner";

export function useAboutPageContent() {
  const [content, setContent] = useState<AboutPageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revisions, setRevisions] = useState<AboutPageRevision[]>([]);
  const [settings, setSettings] = useState<AboutPageSettings | null>(null);

  // Fetch all content
  const fetchContent = async () => {
    try {
      setLoading(true);
      const data = await aboutPageService.getAllContent();
      setContent(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error loading content";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch published content only
  const fetchPublishedContent = async () => {
    try {
      setLoading(true);
      const data = await aboutPageService.getPublishedContent();
      setContent(data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error loading published content";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Get specific section
  const getSectionContent = async (sectionType: string) => {
    try {
      const data = await aboutPageService.getContentBySection(sectionType);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error loading section";
      toast.error(message);
      return null;
    }
  };

  // Update content
  const updateSectionContent = async (
    id: number,
    newContent: Record<string, any>,
    reason?: string,
    author?: string
  ) => {
    try {
      const updated = await aboutPageService.updateContent(
        id,
        newContent,
        reason,
        author
      );
      toast.success("Content updated successfully");
      
      // Refresh the content list
      await fetchContent();
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error updating content";
      toast.error(message);
      throw err;
    }
  };

  // Publish content
  const publishSection = async (id: number, author?: string) => {
    try {
      const published = await aboutPageService.publishContent(id, author);
      toast.success("Content published successfully");
      
      // Refresh
      await fetchContent();
      return published;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error publishing content";
      toast.error(message);
      throw err;
    }
  };

  // Unpublish content
  const unpublishSection = async (id: number, author?: string) => {
    try {
      const unpublished = await aboutPageService.unpublishContent(id, author);
      toast.success("Content unpublished successfully");
      
      // Refresh
      await fetchContent();
      return unpublished;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error unpublishing content";
      toast.error(message);
      throw err;
    }
  };

  // Get revision history
  const getRevisions = async (contentId: number) => {
    try {
      const data = await aboutPageService.getRevisionHistory(contentId);
      setRevisions(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error loading revisions";
      toast.error(message);
      return [];
    }
  };

  // Revert to revision
  const revertToRevision = async (
    contentId: number,
    revisionId: number,
    author?: string
  ) => {
    try {
      const reverted = await aboutPageService.revertToRevision(
        contentId,
        revisionId,
        author
      );
      toast.success("Reverted to previous version");
      
      // Refresh
      await fetchContent();
      return reverted;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error reverting content";
      toast.error(message);
      throw err;
    }
  };

  // Compare revisions
  const compareRevisions = async (
    currentContent: Record<string, any>,
    revisionContent: Record<string, any>
  ) => {
    try {
      return await aboutPageService.compareRevisions(currentContent, revisionContent);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error comparing revisions";
      toast.error(message);
      throw err;
    }
  };

  // Fetch settings
  const fetchSettings = async () => {
    try {
      const data = await aboutPageService.getSettings();
      setSettings(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error loading settings";
      toast.error(message);
      return null;
    }
  };

  // Update settings
  const updateSettings = async (
    newSettings: Partial<AboutPageSettings>,
    author?: string
  ) => {
    try {
      const updated = await aboutPageService.updateSettings(newSettings, author);
      setSettings(updated);
      toast.success("Settings updated successfully");
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error updating settings";
      toast.error(message);
      throw err;
    }
  };

  // Export content
  const exportContent = async () => {
    try {
      const exported = await aboutPageService.exportContent();
      toast.success("Content exported successfully");
      return exported;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error exporting content";
      toast.error(message);
      throw err;
    }
  };

  // Import content
  const importContent = async (jsonContent: string, author?: string) => {
    try {
      await aboutPageService.importContent(jsonContent, author);
      toast.success("Content imported successfully");
      await fetchContent();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error importing content";
      toast.error(message);
      throw err;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchContent();
    fetchSettings();
  }, []);

  return {
    // State
    content,
    loading,
    error,
    revisions,
    settings,

    // Content operations
    fetchContent,
    fetchPublishedContent,
    getSectionContent,
    updateSectionContent,
    publishSection,
    unpublishSection,

    // Revision operations
    getRevisions,
    revertToRevision,
    compareRevisions,

    // Settings operations
    fetchSettings,
    updateSettings,

    // Import/Export
    exportContent,
    importContent,
  };
}
