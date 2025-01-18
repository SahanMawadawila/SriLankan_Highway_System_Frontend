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
      <CardContent
        className="p-4 flex justify-between items-center "
        /* style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }} */
      >
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="text-muted-foreground">{details}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={`View of ${name}`}
            className="rounded-lg 
            object-cover h-32 w-64"
          />
        </div>
      </CardContent>
    </Card>
  );
}
