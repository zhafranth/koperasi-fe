import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModalProps = {
  isOpen: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  description?: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
  footer?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

const sizeMap = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
} as const;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
  description,
  submitText = "Simpan",
  cancelText = "Batal",
  size = "md",
  className,
  headerClassName,
  footerClassName,
  footer,
  loading,
  disabled,
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      modal
    >
      <DialogContent
        className={cn(sizeMap[size], className)}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader
          className={cn(
            "flex flex-row items-center justify-between",
            headerClassName,
          )}
        >
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer !== undefined ? (
          <DialogFooter className={footerClassName}>{footer}</DialogFooter>
        ) : onSubmit ? (
          <DialogFooter className={footerClassName}>
            <Button variant="outline" type="button" onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              type="button"
              onClick={onSubmit}
              loading={loading}
              disabled={disabled}
            >
              {submitText}
            </Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
