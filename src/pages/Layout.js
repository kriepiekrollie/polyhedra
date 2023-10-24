import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./styles.css";


export default function Layout() {
  // inspired by https://www.codemzy.com/blog/react-sticky-header-disappear-scroll
  const [scrollDir, setScrollDir] = useState(1);

  useEffect(() => {
    let lastScroll = window.pageYOffset;

    const update = (event) => {
      const scroll = window.pageYOffset;
      const newScrollDir = scroll > lastScroll ? -1 : 1;
      if (scrollDir !== newScrollDir && Math.abs(scroll - lastScroll) > 10) {
        setScrollDir(newScrollDir);
      }
      lastScroll = scroll > 0 ? scroll : 0;
    };
    window.addEventListener("scroll", update);
    return (() => {
      window.removeEventListener("scroll", update);
    });
  }, [scrollDir]);

  return (
    <>
      <header className={scrollDir === -1 ? "hideHeader" : "showHeader"}>
        <h2> polyhedral playground </h2>
      </header>

      <Outlet />

      <footer>
        <p> This site was made with lots of 💖by benjamin. </p>
        <p> <a href="https://github.com/kriepiekrollie/polyhedra"> view the source code for this project </a> </p>
      </footer>
    </>
  );
}
