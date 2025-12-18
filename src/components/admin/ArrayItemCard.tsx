import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, GripVertical } from "lucide-react";

interface ArrayItemCardProps {
  item: any;
  index: number;
  itemType: 'stats' | 'mission' | 'values';
  onEdit: (item: any, index: number) => void;
  onDelete: (index: number) => void;
}

export function ArrayItemCard({ item, index, itemType, onEdit, onDelete }: ArrayItemCardProps) {
  const getDisplayText = () => {
    if (itemType === 'stats') {
      return `${item.value} ${item.label}`;
    } else if (itemType === 'mission') {
      return item.substring(0, 60) + (item.length > 60 ? '...' : '');
    } else if (itemType === 'values') {
      return item.title;
    }
    return 'Item';
  };

  const getSubText = () => {
    if (itemType === 'stats') {
      return item.icon;
    } else if (itemType === 'mission') {
      return '';
    } else if (itemType === 'values') {
      return item.description.substring(0, 50) + '...';
    }
    return '';
  };

  return (
    <Card className="p-4 flex items-center justify-between gap-3 hover:shadow-md transition">
      <div className="flex items-center gap-3 flex-1">
        <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{getDisplayText()}</p>
          {getSubText() && <p className="text-xs text-muted-foreground truncate">{getSubText()}</p>}
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(item, index)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete(index)}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
