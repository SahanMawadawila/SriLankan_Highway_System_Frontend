import { Card, CardContent } from "../ui/card";

interface InterchangeColumnProps {
  name: string;
  details: string;
  imageUrl: string;
  onClick: () => void;
}

export function InterchangeColumn({
  name,
  details,
  imageUrl,
  onClick,
}: InterchangeColumnProps) {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="p-6 flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-muted-foreground">{details}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={`View of ${name}`}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}
