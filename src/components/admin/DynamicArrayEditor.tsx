import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ArrayItemCard } from "./ArrayItemCard";
import { ArrayItemForm } from "./ArrayItemForm";

interface DynamicArrayEditorProps {
  items: any[];
  itemType: 'stats' | 'mission' | 'values';
  onItemsChange: (items: any[]) => void;
  title?: string;
}

export function DynamicArrayEditor({
  items,
  itemType,
  onItemsChange,
  title,
}: DynamicArrayEditorProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleAddItem = () => {
    setEditingIndex(null);
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEditItem = (item: any, index: number) => {
    setEditingIndex(index);
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onItemsChange(newItems);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newItems = [...items];
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
      onItemsChange(newItems);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < items.length - 1) {
      const newItems = [...items];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      onItemsChange(newItems);
    }
  };

  const handleSaveItem = (item: any) => {
    if (editingIndex !== null) {
      // Update existing item
      const newItems = [...items];
      newItems[editingIndex] = item;
      onItemsChange(newItems);
    } else {
      // Add new item
      onItemsChange([...items, item]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-3">
      {title && <h4 className="font-semibold text-sm">{title}</h4>}
      
      <div className="space-y-2">
        {items.length === 0 ? (
          <Card className="p-4 bg-muted/50 text-center text-muted-foreground">
            No items yet. Click "Add Item" to create one.
          </Card>
        ) : (
          items.map((item, index) => (
            <ArrayItemCard
              key={index}
              item={item}
              index={index}
              itemType={itemType}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          ))
        )}
      </div>

      <Button
        type="button"
        onClick={handleAddItem}
        variant="outline"
        className="w-full"
        size="sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add {itemType === 'stats' ? 'Statistic' : itemType === 'mission' ? 'Mission Item' : 'Value'}
      </Button>

      <ArrayItemForm
        isOpen={dialogOpen}
        item={editingItem}
        itemType={itemType}
        onSave={handleSaveItem}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  );
}
