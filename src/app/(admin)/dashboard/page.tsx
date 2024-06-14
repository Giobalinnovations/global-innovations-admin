import { auth, signOut } from '../../../../auth';

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/auth/login', redirect: true });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
