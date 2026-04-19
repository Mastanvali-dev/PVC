export default function StepProgress({ step, totalSteps, title, percentage }) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-4">
        <div>
          <span className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-1 block">
            Step {step} of {totalSteps}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h1>
        </div>
        <div className="text-sm font-medium text-gray-500">
          {percentage}% Complete
        </div>
      </div>
      
      {/* Progress Bar Container */}
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        {/* Progress Bar Fill */}
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
