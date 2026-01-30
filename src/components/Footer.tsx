import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Footer = () => {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <footer className="py-12 border-t border-border/30">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#hero" className="flex items-center gap-2 text-lg font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-foreground">FUSE_TECH</span>
              <span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 刘伟奇. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {/* Gitee */}
            <a
              href="https://gitee.com/lwqsuper"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Gitee"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296z"/>
              </svg>
            </a>
            
            {/* WeChat QR Code */}
            <Dialog open={qrOpen} onOpenChange={setQrOpen}>
              <DialogTrigger asChild>
                <button
                  className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label="WeChat"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">扫码加入微信群</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center p-4">
                  <img
                    src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100004391/b0eb.png"
                    alt="微信群二维码"
                    className="max-w-full rounded-lg"
                    crossOrigin="anonymous"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  FUSE_TECH AI学习群
                </p>
              </DialogContent>
            </Dialog>
            
            {/* Email */}
            <a
              href="mailto:610207151@qq.com"
              className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
