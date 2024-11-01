type ButtonProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
    DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'className'
> & {
  variant?: 'primary' | 'secondary';
};

const variantClassNames = {
  primary:
    'rounded-full bg-velocity-600 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-velocity-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-velocity-300/50 active:bg-velocity-800',
  secondary:
    'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400'
};

const Button = ({ variant = 'primary', ...props }: ButtonProps) =>
  props.href === 'undefined' ? (
    <button className={variantClassNames[variant]} {...props} />
  ) : (
    <a className={variantClassNames[variant]} {...props} />
  );

export default Button;
