import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="ghost"
      className={`group hover:bg-gray-100 ${className}`}
    >
      <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
      Kembali
    </Button>
  );
};

export default BackButton;
