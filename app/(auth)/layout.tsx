import styles from "./layout.module.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.sign_page}>{children}</main>;
};
export default AuthLayout;
