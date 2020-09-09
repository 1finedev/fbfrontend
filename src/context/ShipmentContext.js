import React, { createContext, useState, useEffect, useContext } from 'react';
import ShipmentService from './../services/ShipmentService';
import { AuthContext } from './AuthContext';

export const ShipmentContext = createContext(null);

export default ({ children }) => {
  const { role } = useContext(AuthContext);
  const [Messages, setMessages] = useState(null);
  const [todayShipment, setTodayShipment] = useState(null);
  const [stats, setStats] = useState(null);
  const [agentWeekStats, setAgentWeekStats] = useState(0);
  const [shipments, setShipments] = useState(null);
  const [shipmentsAgent, setShipmentsAgent] = useState(null);
  const [update, setUpdate] = useState(null);

  const getTotalAdminStats = async () => {
    const res = await ShipmentService.getTotalAdminStats();
    if (res.length > 0) {
      setStats(res[0]);
    }
  };
  const getWeeklyShips = async () => {
    const res = await ShipmentService.getWeeklyStats();
    if (res.length > 0) {
      setStats(res[0]);
    }
  };
  const getStats = async () => {
    const res = await ShipmentService.getTotalStats();
    if (res.length > 0) {
      setStats(res[0]);
    }
  };

  const getWeekShipmentsAgent = async () => {
    const res = await ShipmentService.getWeekShipmentsAgent();
    const { doc } = res;
    const totalWeekShips = doc && doc.length;
    setAgentWeekStats(totalWeekShips);
  };

  useEffect(() => {
    if (role === 'mod') {
      getWeeklyShips();
    } else if (role === 'admin') {
      getTotalAdminStats();
    } else {
      getWeekShipmentsAgent();
      getStats();
    }
  }, [role]);

  return (
    <div>
      <ShipmentContext.Provider
        value={{
          stats,
          setStats,
          agentWeekStats,
          setAgentWeekStats,
          Messages,
          setMessages,
          todayShipment,
          setTodayShipment,
          shipments,
          setShipments,
          shipmentsAgent,
          setShipmentsAgent,
          update,
          setUpdate
        }}
      >
        {children}
      </ShipmentContext.Provider>
    </div>
  );
};
