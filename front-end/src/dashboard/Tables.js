import React, { useEffect, useState } from 'react';
import ErrorAlert from '../layout/ErrorAlert';
import { deleteSeat, listTables } from '../utils/api';
import './Tables.css';

const Tables = () => {
  const [tables, setTables] = useState([]);

  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, [tables]);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables().then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const finishBtn = (tableId) => {
    if (
      window.confirm(
        'Is this table ready to seat new guests? \n\nThis cannot be undone.'
      )
    ) {
      deleteSeat(tableId)
        .then(() => loadTables())
        .catch(setTablesError);
    } else {
      loadTables();
    }
  };
  return (
    <div className='tables'>
      <h4 className='mt-4 mb-0'>Tables</h4>
      <ErrorAlert error={tablesError} />
      <div className='tablesSection'>
        {tables.map((table) => (
          <div key={table.table_id} className='tableCard'>
            <p className='tableHeader'>{table.table_name}</p>
            <p className='tableStatus' data-table-id-status={table.table_id}>
              {table.reservation_id ? (
                <p
                  style={{ color: 'red' }}
                  data-table-id-status={table.table_id}
                >
                  occupied
                </p>
              ) : (
                <p
                  style={{ color: 'green' }}
                  data-table-id-status={table.table_id}
                >
                  free
                </p>
              )}
            </p>
            {table.reservation_id && (
              <button
                className='btn btn-danger mb-3 mt-1'
                data-table-id-finish={table.table_id}
                onClick={() => finishBtn(table.table_id)}
              >
                Finish
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
