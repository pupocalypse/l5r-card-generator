function FormNav({ activeTab, clickActiveTab }) {
  const tabs = [
    { buttonText: "Details", panelId: "form" },
    { buttonText: "Upload Artwork", panelId: "uploader" },
    { buttonText: "Collection", panelId: "collection" },
  ];

  const tabButtons = tabs.map((tab, i) => {
    let classes = "form-container__tab";
    if (activeTab[i]) {
      classes += " form-container__tab--active";
    }
    return (
      <button
        key={i}
        className={classes}
        onClick={(e) => clickActiveTab(e, i)}
        role="tab"
        aria-controls={tab.panelId}
      >
        {tab.buttonText}
      </button>
    );
  });

  return (
    <nav className="form-container__nav" role="tablist">
      {tabButtons}
    </nav>
  );
}

export default FormNav;
