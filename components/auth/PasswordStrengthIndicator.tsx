"use client";

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface StrengthLevel {
  label: string;
  color: string;
  bgColor: string;
  score: number;
}

function calculateStrength(password: string): StrengthLevel {
  if (!password) {
    return { label: "", color: "", bgColor: "bg-gray-200", score: 0 };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Map raw score (0-6) to 4 display levels
  if (score <= 2) {
    return { label: "Yếu", color: "text-red-500", bgColor: "bg-red-500", score: 1 };
  } else if (score === 3) {
    return { label: "Trung bình", color: "text-yellow-500", bgColor: "bg-yellow-500", score: 2 };
  } else if (score === 4) {
    return { label: "Khá", color: "text-blue-500", bgColor: "bg-blue-500", score: 3 };
  } else {
    return { label: "Mạnh", color: "text-green-500", bgColor: "bg-green-500", score: 4 };
  }
}

export default function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="mt-1">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              strength.score >= level ? strength.bgColor : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      {strength.label && (
        <p className={`text-xs font-medium ${strength.color}`}>
          Độ mạnh: {strength.label}
        </p>
      )}
    </div>
  );
}
