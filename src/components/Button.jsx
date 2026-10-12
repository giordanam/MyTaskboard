export default function Button({
  children,
  variant = 'default',
  type = 'button',
  className = '',
  ...props
}) {
  // Stili comuni: forma, spaziatura interna, testo, focus, disabilitato, transizioni
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Dizionario delle varianti visive
  const variants = {
    default: 'bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    // Per "Annulla": uso secondary perché fa azione diversa rispetto a default
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    // Per "Elimina attività": variante ghost senza sfondo
    ghost: 'bg-transparent text-red-600 hover:bg-gray-100 focus:ring-gray-400',
  };

  // Gestione dell'errore se qualcuno passa una variante inventata (es. "primary")
  const safeVariant = variants[variant] ? variant : 'default';
  const variantStyles = variants[safeVariant];

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props} // Inoltra onClick, disabled, aria-label, ecc.
    >
      {children}
    </button>
  );
}
