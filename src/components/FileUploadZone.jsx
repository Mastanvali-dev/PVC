export default function FileUploadZone({ title, icon: Icon, file, onChange }) {
  return (
    <div className="flex-1 w-full relative">
      <input 
        type="file" 
        accept="image/*,application/pdf"
        onChange={(e) => onChange(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        aria-label={`Upload ${title}`}
      />
      <div className={`border-2 border-dashed ${file ? 'border-green-400 bg-green-50/20' : 'border-gray-200'} rounded-2xl p-8 md:p-10 text-center flex flex-col items-center justify-center transition-colors duration-200 hover:border-blue-400 hover:bg-blue-50/30 group h-full`}>
        <div className={`w-12 h-12 rounded-full ${file ? 'bg-green-100' : 'bg-blue-50'} flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors`}>
          <Icon className={file ? "text-green-600" : "text-blue-600"} size={24} />
        </div>
        <h3 className="text-gray-900 font-bold mb-1">{title}</h3>
        <p className={`text-xs md:text-sm ${file ? 'text-green-600 font-medium' : 'text-gray-500 truncate max-w-[200px]'}`}>
          {file ? file.name : "Drag and drop or click to upload"}
        </p>
      </div>
    </div>
  );
}
