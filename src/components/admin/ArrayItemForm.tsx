import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IconSelector } from "./IconSelector";

interface ArrayItemFormProps {
  isOpen: boolean;
  item: any | null;
  itemType: 'stats' | 'mission' | 'values';
  onSave: (item: any) => void;
  onCancel: () => void;
}

export function ArrayItemForm({ isOpen, item, itemType, onSave, onCancel }: ArrayItemFormProps) {
  const [formData, setFormData] = useState(item || getDefaultItem(itemType));

  function getDefaultItem(type: string) {
    if (type === 'stats') {
      return { value: '', label: '', icon: 'Sparkles' };
    } else if (type === 'mission') {
      return '';
    } else if (type === 'values') {
      return { title: '', description: '', icon: 'Sparkles' };
    }
    return null;
  }

  const handleSave = () => {
    onSave(formData);
    setFormData(getDefaultItem(itemType));
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {item ? 'Edit' : 'Add'} {itemType === 'stats' ? 'Statistic' : itemType === 'mission' ? 'Mission' : 'Value'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {itemType === 'stats' && (
            <>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g., 500+"
                />
              </div>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., Anggota Aktif"
                />
              </div>
              <IconSelector
                value={formData.icon}
                onChange={(icon) => setFormData({ ...formData, icon })}
              />
            </>
          )}

          {itemType === 'mission' && (
            <div className="space-y-2">
              <Label>Mission Description</Label>
              <Textarea
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                placeholder="Enter mission description..."
                rows={4}
              />
            </div>
          )}

          {itemType === 'values' && (
            <>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Integritas"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description..."
                  rows={3}
                />
              </div>
              <IconSelector
                value={formData.icon}
                onChange={(icon) => setFormData({ ...formData, icon })}
              />
            </>
          )}
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {item ? 'Update' : 'Add'} Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
