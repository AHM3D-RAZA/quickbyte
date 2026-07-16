import {
  Clock,
  ChefHat,
  Utensils,
  Bike,
  CheckCircle2,
} from "lucide-react";

const steps = [
  { label: "Pending", icon: Clock },
  { label: "Accepted", icon: ChefHat },
  { label: "Preparing", icon: Utensils },
  { label: "Out for delivery", icon: Bike },
  { label: "Delivered", icon: CheckCircle2 },
];

export default function OrderStepper({ status }) {
  const currentStepIndex = steps.findIndex(
    (step) =>
      step.label.toLowerCase() === (status || "").toLowerCase()
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const active = index <= currentStepIndex;

          return (
            <div key={step.label} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  active
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}