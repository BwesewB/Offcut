import styles from "./styles/page.module.css";
import Image from "next/image";
import rock1 from "/public/images/LandscapeRock1.webp"
import rock3vert from "/public/images/Rock3-2.png"
import MediaBlock from "./components/molecules/mediaBlock/MediaBlock";
import TwoColumn from "./components/molecules/twoColumn/TwoColumn";

export default function Home() {
  return (
    <>
      <main>
        <div className={styles.heroContainer}>
          <h1 className={styles.title}>Offcut</h1>
        </div>
        
        <Image 
          src={rock1}
          className={styles.media}
        />

        <TwoColumn 
          // left={

          // }
          right={
            <MediaBlock image={rock3vert} alt="A stone on a white background"/>
          }
        />
      
      </main>
    </>
  );
}
