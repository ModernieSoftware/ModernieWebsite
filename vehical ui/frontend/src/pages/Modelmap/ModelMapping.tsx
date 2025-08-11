import React, { useEffect, useState } from 'react';
import { Plus, Upload, Download, GitBranch, Pen, Trash } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import axios from 'axios';

type ModelMapping = {
  id: string;
  make: string;
  originalModel: string;
  mapModelName: string;
  updatedAt: string;
};

type GroupedRow = {
  originalModel: string;
  make: string;
  mappedNames: string[];
  updatedAt: string;
};

const ModelMappingPage: React.FC = () => {
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMapping, setEditingMapping] = useState<ModelMapping | null>(null);
  const [newMapping, setNewMapping] = useState({

    originalModel: '',
    mapModelName: '',
    make: '',
  });

  const [fetchedModelMappings, setFetchedModelMappings] = useState<ModelMapping[]>([]);

  useEffect(() => {
    const fetchModelMappings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/modelmaps');
        if (Array.isArray(response.data)) {
          const modelMappings: ModelMapping[] = response.data.map((item: {
            id: string | number;
            make: string;
            model: string;
            map_model_name: string;
            updated_at: string;
          }) => ({
            id: item.id.toString(),
            make: item.make,
            originalModel: item.model,
            mapModelName: item.map_model_name,
            updatedAt: item.updated_at,
          }));
          setFetchedModelMappings(modelMappings);
        }
      } catch (error) {
        console.error('Error fetching model mappings:', error);
      }
    };

    fetchModelMappings();
  }, []);

  // Group by original model
  const groupedByOriginal = fetchedModelMappings.reduce((acc, mapping) => {
    const { originalModel, mapModelName, make, updatedAt } = mapping;
    if (!acc[originalModel]) {
      acc[originalModel] = {
        make,
        mappedNames: [],
        updatedAt,
      };
    }
    acc[originalModel].mappedNames.push(mapModelName);
    return acc;
  }, {} as Record<string, { make: string; mappedNames: string[]; updatedAt: string }>);

  const groupedRows: GroupedRow[] = Object.entries(groupedByOriginal).map(([originalModel, data]) => ({
    originalModel,
    make: data.make,
    mappedNames: data.mappedNames,
    updatedAt: data.updatedAt,
  }));
  //add new mapping
  // const handleAddMapping = () => {
  //   setShowAddModal(true);
  //   setEditingMapping(null);
  //   setNewMapping({ originalModel: '', mapModelName: '', make: '' });
  // };

  const handleEditMapping = (mapping: ModelMapping) => {
    setEditingMapping(mapping);
    setNewMapping({
      originalModel: mapping.originalModel,
      mapModelName: mapping.mapModelName,
      make: mapping.make,
    });
    setShowAddModal(true);
  };


  const deleteDetailsModal = (vehicle: ModelMapping) => {
    if (window.confirm(`Are you sure you want to delete the mapping for ${vehicle.originalModel}?`)) {
      axios.delete(`http://localhost:8000/api/modelmaps/${vehicle.id}`)
        .then(() => {
          setFetchedModelMappings(prev => prev.filter(m => m.id !== vehicle.id));
          alert('Mapping deleted successfully');
        })
        .catch(error => {
          console.error('Error deleting mapping:', error);
          alert('Failed to delete mapping');
        });
    }
  };
  
  // Define columns for the DataTable


  const columns = [
    {
      key: 'make',
      header: 'Make',
      sortable: true,
    },
    {
      key: 'originalModel',
      header: 'Original Model',
      sortable: true,
    },
    {
      key: 'mappedNames',
      header: 'Mapped Model Names',
      render: (row: GroupedRow) => (
        <ul className="list-disc pl-5 space-y-1">
          {row.mappedNames.map((name, idx) => {
            const mappingToEdit = fetchedModelMappings.find(
              m => m.originalModel === row.originalModel && m.mapModelName === name
            );
            const mappingTodelete = fetchedModelMappings.find(
              m => m.originalModel === row.originalModel && m.mapModelName === name
            );
            return (
              <li key={idx} className="flex items-end space-x-2 justify-between">
                <span>{name}</span>
                <div className="flex items-center space-x-2">
                {mappingToEdit && (
                  <div className="text-xs text-slate-500">
                  <button
                    onClick={() => handleEditMapping(mappingToEdit)}
                    className="text-blue-600 hover:underline text-xs ml-2"
                  >
                    <Pen  className="w-4 h-4 inline" />
                  </button>
                  </div>
                )}
                {mappingTodelete && (
                  <button
                    onClick={() => {
                      deleteDetailsModal(mappingTodelete);
                      console.log('Delete mapping:', mappingTodelete);
                    }}
                    className="text-red-600 hover:underline text-xs ml-2"
                    
                  >
                    <Trash className="w-4 h-4 inline" />
                  </button>
                )}  </div>
              </li>

            );
          })}
        </ul>
      ),
    },
    // {
    //   key: 'updatedAt',
    //   header: 'Last Updated',
    //   render: (row: GroupedRow) => new Date(row.updatedAt).toLocaleDateString(),
    // },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Model Mapping</h1>
          <p className="text-slate-600 mt-1">Manage vehicle model mappings and standardization</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import</span>
          </button>
          <button
            onClick={() =>  {
              setShowAddModal(true);
              setEditingMapping(null);
              setNewMapping({ originalModel: '', mapModelName: '', make: '' });
              console.log('Add new mapping clicked');
              if (showAddModal) {
                setShowAddModal(false);
              } else {
                setShowAddModal(true);    
            }}
            }            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Mapping</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Mappings</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{fetchedModelMappings.length}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Unique Original Models</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{groupedRows.length}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={groupedRows}
        columns={columns}
        searchable
        searchPlaceholder="Search original models..."
      />

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                {editingMapping ? 'Edit Mapping' : 'Add New Mapping'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingMapping(null);
                  setNewMapping({ originalModel: '', mapModelName: '', make: '' });
                }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Make</label>
                <input
                  type="text"
                  value={newMapping.make}
                  onChange={(e) => setNewMapping(prev => ({ ...prev, make: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g., Toyota"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Original Model</label>
                <input
                  type="text"
                  value={newMapping.originalModel}
                  onChange={(e) => setNewMapping(prev => ({ ...prev, originalModel: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g., Vitz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mapped Model Name</label>
                <input
                  type="text"
                  value={newMapping.mapModelName}
                  onChange={(e) => setNewMapping(prev => ({ ...prev, mapModelName: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  placeholder="e.g., Toyota Vitz 1.0L"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingMapping(null);
                    setNewMapping({ originalModel: '', mapModelName: '', make: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingMapping) {
                      axios.put(`http://localhost:8000/api/modelmaps/${editingMapping.id}`, {
                        make: newMapping.make,
                        model: newMapping.originalModel,
                        map_model_name: newMapping.mapModelName,
                      })
                      .then(() => {
                        setFetchedModelMappings(prev => prev.map(m => m.id === editingMapping.id ? { ...m, ...newMapping } : m));
                        setEditingMapping(null);
                        setShowAddModal(false);
                      })
                      .catch(error => console.error('Error updating mapping:', error));
                    } else {
                      axios.post('http://localhost:8000/api/modelmaps', {
                        make: newMapping.make,
                        model: newMapping.originalModel,
                        map_model_name: newMapping.mapModelName,
                      })
                      .then(response => {
                        setFetchedModelMappings(prev => [...prev, response.data]);
                        setShowAddModal(false);
                      })
                      .catch(error => console.error('Error adding mapping:', error));
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {editingMapping ? 'Update' : 'Add'} Mapping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelMappingPage;
