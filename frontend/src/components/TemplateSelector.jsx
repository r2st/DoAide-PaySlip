const TEMPLATES = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Clean professional layout with blue accents',
    color: 'bg-blue-500',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Formal design with dark header and gold accents',
    color: 'bg-gray-800',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary with indigo gradients',
    color: 'bg-indigo-500',
  },
]

export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {TEMPLATES.map(t => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelect(t.id)}
          className={`p-4 rounded-xl border-2 transition-all text-left ${
            selected === t.id
              ? 'border-primary-500 bg-primary-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-4 h-4 rounded ${t.color}`} />
            <span className="font-semibold text-gray-900">{t.name}</span>
          </div>
          <p className="text-xs text-gray-500">{t.description}</p>
        </button>
      ))}
    </div>
  )
}
