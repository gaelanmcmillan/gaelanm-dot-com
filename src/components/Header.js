import Link from "next/link";
import { useRouter } from "next/router";
import { navbar } from "../styles/Header.module.scss";
import BowlingAlley from "./BowlingAlley";

const pages = [
  // {href: "/blog", title: "Blog"},
  { href: "/works", title: "Works" },
  { href: "/solves", title: "Solves" },
];

const NavButton = ({ title, route, asPath }) => {
  const extrusionClass = (() => {
    if (route == "/") return asPath == "/" ? "semi-extruded" : "extruded";
    else return asPath.search(route) != -1 ? "semi-extruded" : "extruded";
  })();

  const classes = ["user-select-none", extrusionClass];
  const classString = classes.join(" ");
  return (
    <div className="minimal-width">
      <Link href={route}>
        <a>
          <h1 className={classString}>{title}</h1>
        </a>
      </Link>
    </div>
  );
};

const Header = () => {
  const { asPath } = useRouter();

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <BowlingAlley className={`nav-row soft-shadow`} >
        <nav>
        </nav>
        <nav className={navbar}>
          <div>
            <NavButton title="Gaelan McMillan" route="/" asPath={asPath} />
          </div>
          <div>
            {pages.map(({ href, title }, i) => {
              return (
                <div key={i} style={{ marginLeft: `${i > 0 ? 8 : 0}ch` }}>
                  <NavButton title={title} route={href} asPath={asPath} />
                </div>
              );
            })}
          </div>
        </nav>
      </BowlingAlley>
    </header>
  );
};

export default Header;
