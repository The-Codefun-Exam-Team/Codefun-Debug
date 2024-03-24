import { Input } from "@/components";

export const InputsSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <Input
          id="login-form-username-input"
          name="username"
          label="Username"
          placeholder="Username"
          errorTextId="login-form-username-error-text"
          error={false}
          disabled={true}
        />
      </div>
      <div>
        <Input
          id="login-form-password-input"
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          errorTextId="login-form-password-error-text"
          error={false}
          disabled={true}
        />
      </div>
      <button
        type="submit"
        disabled={true}
        className="rounded-md border-2 border-slate-600 p-2 text-lg font-medium text-slate-700 transition-opacity disabled:opacity-70 dark:border-[1px] dark:border-slate-400 dark:text-slate-300"
      >
        {"Sign in"}
      </button>
    </div>
  );
};
