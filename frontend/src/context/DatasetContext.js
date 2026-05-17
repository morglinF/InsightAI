import { createContext, useContext, useState } from "react";

const DatasetContext = createContext();

export function DatasetProvider({ children }) {

  const [datasets, setDatasets] = useState([]);

  const [activeDataset, setActiveDataset] = useState(null);

  return (
    <DatasetContext.Provider
      value={{
        datasets,
        setDatasets,
        activeDataset,
        setActiveDataset,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
}

export function useDatasets() {
  return useContext(DatasetContext);
}