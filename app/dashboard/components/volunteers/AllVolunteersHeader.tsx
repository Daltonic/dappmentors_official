import React, { useState } from "react";
import Volunteers from "./Volunteers";
import Button from "../shared/Button";

export default function AllVolunteersHeader() {
  const [showAllVolunteers, setShowAllVolunteers] = useState(false);

  const handleGoBack = () => setShowAllVolunteers(true);

  if (showAllVolunteers) {
    return <Volunteers />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg">All Volunteers</h1>
        <Button label="go back" onClick={handleGoBack} />
      </div>
    </div>
  );
}
