import styles from "../styles/footer.module.scss";
const Footer = () => {
  return (
    <>
        <footer className={` text-dark text-center py-4  ${styles.footer}`}>
          <div className="container mx-auto">
            <div className="flex justify-center">
              <div className="w-full md:w-1/2">
                <p className="text-base">&copy; Coded with ❤️ by Jose Miguel. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
    </>
  )
}

export default Footer
