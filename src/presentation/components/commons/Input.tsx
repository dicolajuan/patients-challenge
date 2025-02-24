
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input = ({
    label,
    error,
    ...props
}: InputProps) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">{label}</label>
            <input className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary" {...props} data-testid={`input-${label}`} />
            {error && <p className="text-red-500 text-sm">*{error}</p>}
        </div>
    );
};
