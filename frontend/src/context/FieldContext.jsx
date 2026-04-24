import { createContext, useEffect, useState } from "react";
import axios from "axios";

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
      return {
        success: true,
        message: response.data?.message || "Field created successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.response?.data?.message || "Error creating field",
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
      }}
    >
      {children}
    </FieldContext.Provider>
  );
};
