export default function StatCard({
    title,
    value,
    icon = 'chart-line',
    change,
    changeLabel = '전년 대비',
    color = 'default',
    size = 'md',
    showAnimation = true
  }) {
    const colorClasses = {
      default: 'bg-white hover:bg-gray-50',
      blue: 'bg-blue-50 hover:bg-blue-100',
      green: 'bg-green-50 hover:bg-green-100',
      red: 'bg-red-50 hover:bg-red-100',
      yellow: 'bg-yellow-50 hover:bg-yellow-100',
      purple: 'bg-purple-50 hover:bg-purple-100',
      teal: 'bg-teal-50 hover:bg-teal-100'
    };
  
    const iconColors = {
      default: 'bg-gray-100',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
      teal: 'bg-teal-100 text-teal-600'
    };
  
    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };
  
    const valueSizeClasses = {
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-3xl'
    };
  
    const iconPath = `${import.meta.env.BASE_URL}images/svg/${icon}.svg`;
    const animationClass = showAnimation ? 'transform transition-all duration-300 hover:scale-105 hover:shadow-md' : '';
  
    return (
      <div className={`stat-card ${sizeClasses[size]} rounded-lg shadow-sm ${colorClasses[color]} ${animationClass} border border-gray-100`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className={`${valueSizeClasses[size]} font-bold mt-1 tracking-tight`}>{value}</p>
  
            {change !== undefined && (
              <div className="mt-2 flex items-center">
                <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                  {change >= 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {Math.abs(change)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">{changeLabel}</span>
              </div>
            )}
          </div>
  
          {icon && (
            <div className={`w-12 h-12 rounded-full ${iconColors[color]} flex items-center justify-center`}>
              <img src={iconPath} alt={title} className="w-6 h-6" />
            </div>
          )}
        </div>
      </div>
    );
  }
  