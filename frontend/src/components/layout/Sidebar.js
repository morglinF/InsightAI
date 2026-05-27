import {
  Database,
  Upload,
  Settings,
} from "lucide-react";

import toast from "react-hot-toast";
import api from "../../api/client";


import { useDatasets } from "../../context/DatasetContext";

export default function Sidebar() {

  const {
    datasets,
    setDatasets,
    activeDataset,
    setActiveDataset,
  } = useDatasets();

  // upload dataset
  const uploadDataset = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    try {

      toast.loading("Uploading dataset...", {
        id: "upload",
      });
      
      
import api from "../../api/client";

const resp = await api.post(
  "/upload",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

const data = response.data;


      const uploadedDataset = res.data;

      setDatasets((prev) => [
        ...prev.filter(Boolean),
        uploadedDataset,
]);

      setActiveDataset(uploadedDataset);

      toast.success("Dataset uploaded!", {
        id: "upload",
      });

    } catch (err) {

      console.log(err);

      toast.error("Upload failed", {
        id: "upload",
      });
    }
  };

  return (

    <div className="w-[260px] h-screen bg-sidebar border-r border-border flex flex-col">

      {/* LOGO */}
      <div className="p-6 border-b border-border">

        <h1 className="text-2xl font-bold">
          Insight<span className="text-primary">AI</span>
        </h1>

        <p className="text-sm text-textSecondary mt-1">
          AI Data Intelligence
        </p>

      </div>

      {/* UPLOAD */}
      <div className="p-4">

        <label
          className="
            w-full
            bg-primary
            hover:bg-purple-700
            transition-all
            rounded-2xl
            p-3
            flex
            items-center
            justify-center
            gap-2
            shadow-glow
            cursor-pointer
          "
        >

          <Upload size={18} />

          Upload Dataset

          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              uploadDataset(e.target.files[0])
            }
          />

        </label>

      </div>

      {/* DATASETS */}
      <div className="flex-1 px-3 overflow-y-auto">

        <p className="text-xs uppercase text-textSecondary mb-3 px-2">
          Datasets
        </p>

        {datasets.map((dataset) => (

          <div
            key={dataset?.file_id}
            onClick={() =>
              setActiveDataset(dataset)
            }
            className={`
              rounded-2xl
              p-3
              flex
              items-center
              gap-3
              cursor-pointer
              mb-2
              transition-all

              ${
                activeDataset?.file_id === dataset?.file_id
                  ? "bg-primary/20 border border-primary"
                  : "bg-surface hover:bg-slate-800"
              }
            `}
          >

            <Database size={18} />

            <div>

              <p className="text-sm font-medium">
                {dataset.original_name}
              </p>

              <p className="text-xs text-textSecondary">
                Ready for analysis
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* SETTINGS */}
      <div className="p-4 border-t border-border">

        <button
          className="
            w-full
            flex
            items-center
            gap-2
            p-3
            rounded-2xl
            hover:bg-surface
            transition-all
          "
        >

          <Settings size={18} />

          Settings

        </button>

      </div>

    </div>
  );
}