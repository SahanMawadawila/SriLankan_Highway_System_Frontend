import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./signup-form";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [islogin, setislogin] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 max-w-[800px]">
        {islogin ? (
          <LoginForm onsign={() => setislogin(false)} />
        ) : (
          <SignUpForm onBack={() => setislogin(true)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
