import { Form, NavLink } from "react-router-dom";

// Import nav logo
import logomark from "../assets/logomark.svg";

// Import icons
import { TrashIcon } from "@heroicons/react/24/solid";

export default function NavBar({ userName }) {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="Navbar logo" />
        <span>HomeBudget</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(e) => {
            if (
              !confirm(
                "Once deleted, you will not be able to recover this data!"
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Delete User</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}
