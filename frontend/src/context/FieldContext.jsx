import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const FieldContext = createContext(null);

export const FieldProvider = ({ children }) => {
  const [fields, setFields] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loadingFields, setLoadingFields] = useState(true);
  const [loadingAgents, setLoadingAgents] = useState(true);

  const fetchFields = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/fields");
      setFields(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      if (error.response?.status === 404) {
        setFields([]);
      } else {
        console.log(error);
      }
    } finally {
      setLoadingFields(false);
    }
  };

  const createField = async (fieldData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/fields/create",
        fieldData,
        { withCredentials: true },
      );

      await fetchFields();
      toast.success(response.data?.message || "Field created successfully");
      return {
        success: true,
        message: response.data?.message || "Field created successfully",
      };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error creating field");
      return {
        success: false,
        message: error.response?.data?.message || "Error creating field",
      };
    }
  };

  const updateField = async (id, fieldData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/fields/update/${id}`,
        fieldData,
        { withCredentials: true },
      );

      await fetchFields();
      toast.success(response.data?.message || "Field updated successfully");
      return {
        success: true,
        message: response.data?.message || "Field updated successfully",
      };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error updating field");
      return {
        success: false,
        message: error.response?.data?.message || "Error updating field",
      };
    }
  };

  const deleteField = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/fields/delete/${id}`,
        { withCredentials: true },
      );

      await fetchFields();
      toast.success(response.data?.message || "Field deleted successfully");
      return {
        success: true,
        message: response.data?.message || "Field deleted successfully",
      };
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error deleting field");
      return {
        success: false,
        message: error.response?.data?.message || "Error deleting field",
      };
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/agents", {
        withCredentials: true,
      });
      setAgents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
      setAgents([]);
    } finally {
      setLoadingAgents(false);
    }
  };

  useEffect(() => {
    fetchFields();
    fetchAgents();
  }, []);

  return (
    <FieldContext.Provider
      value={{
        fields,
        agents,
        loadingFields,
        loadingAgents,
        fetchFields,
        fetchAgents,
        createField,
        updateField,
        deleteField,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
};
