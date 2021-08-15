function FormNav({ activeTab, clickActiveTab }) {
  const tabs = ["Details", "Upload Artwork", "Collection"];

  const tabButtons = tabs.map((tab, i) => {
    let classes = "form-container__tab";
    if (activeTab[i]) {
      classes += " form-container__tab--active";
    }
    return (
      <button key={i} className={classes} onClick={(e) => clickActiveTab(e, i)}>
        {tab}
      </button>
    );
  });

  return <nav className="form-container__nav">{tabButtons}</nav>;
}

export default FormNav;
