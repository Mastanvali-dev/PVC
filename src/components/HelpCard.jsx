import { HelpCircle } from "lucide-react";

export default function HelpCard() {
  return (
    <div className="bg-blue-50 rounded-2xl p-6 w-full border border-blue-100 flex items-start gap-4 mt-6">
      <HelpCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <h4 className="font-bold text-sm text-blue-900 mb-1">Need help with your order?</h4>
        <p className="text-xs text-blue-700 leading-relaxed">
          Our concierge team is available 24/7 to ensure your cards are perfect.
        </p>
      </div>
    </div>
  );
}
