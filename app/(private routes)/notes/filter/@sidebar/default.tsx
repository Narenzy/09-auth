import css from "../../../api/notes/filter/@sidebar/SidebarNotes.module.css";

export default function SideBarNotes() {
  const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <a href="/notes/filter/all" className={css.menuLink}>
          All notes
        </a>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <a href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
