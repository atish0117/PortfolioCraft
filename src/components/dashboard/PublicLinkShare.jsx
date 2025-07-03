import React from "react";
import { useSelector } from "react-redux";
import { Copy, QrCode } from "lucide-react";
// import {QRCode} from "qrcode.react";
import { toast } from "react-toastify";

const PublicLinkShare = () => {
  const { user } = useSelector((state) => state.profile);

  if (!user?.username) return null;

  const publicUrl = `${window.location.origin}/portfolio/${user.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="bg-white p-6 mt-8 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Public Share Link</h2>
      <div className="flex items-center justify-between gap-4">
        <input
          value={publicUrl}
          readOnly
          className="flex-1 border p-2 rounded bg-gray-100"
        />
        <button onClick={handleCopy} className="text-blue-600 hover:underline">
          <Copy className="w-5 h-5" />
        </button>
        <button onClick={() => window.open(publicUrl, "_blank")}>Visit</button>
      </div>

      <div className="mt-4 text-center">
        <QRCode value={publicUrl} size={128} fgColor="#000" />
        <p className="text-sm text-gray-600 mt-2">Scan to preview portfolio</p>
      </div>
    </div>
  );
};

export default PublicLinkShare;
