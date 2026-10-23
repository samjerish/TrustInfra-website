'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Package,
  ShoppingCart,
  Truck,
  Receipt,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  IndianRupee,
  ChevronRight,
  X,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const stats = [
  {
    title: 'Total Inventory',
    value: '1,245',
    change: 8,
    icon: Package,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Pending Quotations',
    value: '8',
    change: -3,
    icon: Receipt,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Active Orders',
    value: '15',
    change: 5,
    icon: ShoppingCart,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Revenue (Month)',
    value: '₹18.5L',
    change: 12,
    icon: IndianRupee,
    color: 'from-purple-500 to-pink-600',
  },
];

const initialInventory = [
  {
    id: 1,
    name: 'OPC 53 Grade Cement',
    sku: 'CEM-001',
    stock: 850,
    unit: 'bags',
    price: 380,
    status: 'in_stock',
  },
  {
    id: 2,
    name: 'TMT Steel Bar Fe500D 12mm',
    sku: 'STL-012',
    stock: 5000,
    unit: 'kg',
    price: 72,
    status: 'in_stock',
  },
  {
    id: 3,
    name: 'M-Sand (Fine Aggregate)',
    sku: 'SND-001',
    stock: 200,
    unit: 'cu.m',
    price: 1800,
    status: 'low_stock',
  },
  {
    id: 4,
    name: 'Red Bricks (Standard)',
    sku: 'BRK-001',
    stock: 25000,
    unit: 'nos',
    price: 8,
    status: 'in_stock',
  },
  {
    id: 5,
    name: 'AAC Blocks (600x200x150)',
    sku: 'BLK-001',
    stock: 50,
    unit: 'nos',
    price: 55,
    status: 'low_stock',
  },
  {
    id: 6,
    name: '20mm Aggregate',
    sku: 'AGG-020',
    stock: 0,
    unit: 'cu.m',
    price: 2200,
    status: 'out_of_stock',
  },
];

const initialQuotationRequests = [
  {
    id: 'QR-101',
    material: 'Cement OPC 53 Grade',
    qty: '200 bags',
    buyer: 'Arun Verma',
    project: 'Green Valley',
    deadline: '18 Jul',
    status: 'new',
  },
  {
    id: 'QR-102',
    material: 'TMT Bar 16mm',
    qty: '3000 kg',
    buyer: 'Deepak Singh',
    project: 'Sunrise Complex',
    deadline: '19 Jul',
    status: 'quoted',
  },
  {
    id: 'QR-103',
    material: 'River Sand',
    qty: '50 cu.m',
    buyer: 'Priya Iyer',
    project: 'Lakeview',
    deadline: '20 Jul',
    status: 'new',
  },
  {
    id: 'QR-104',
    material: 'M20 RMC',
    qty: '100 cu.m',
    buyer: 'Arun Verma',
    project: 'Green Valley',
    deadline: '21 Jul',
    status: 'accepted',
  },
];

const deliveries = [
  {
    id: 'DEL-201',
    order: 'Cement 200 bags',
    destination: 'Green Valley Site',
    eta: 'Today, 2:00 PM',
    driver: 'Ravi Kumar',
    status: 'in_transit',
  },
  {
    id: 'DEL-202',
    order: 'Steel 2000 kg',
    destination: 'Lakeview Site',
    eta: 'Tomorrow, 10:00 AM',
    driver: 'Sunil Yadav',
    status: 'loading',
  },
  {
    id: 'DEL-203',
    order: 'Bricks 10000 nos',
    destination: 'Sunrise Site',
    eta: '19 Jul, 8:00 AM',
    driver: 'Pending',
    status: 'scheduled',
  },
];

export default function DealerDashboard({ params }: { params: { subpath?: string[] } }) {
  const currentSubpath = params.subpath?.[0] || 'overview';

  const [activeTab, setActiveTab] = useState(
    currentSubpath === 'overview' ? 'inventory' : currentSubpath
  );
  const [inventoryList, setInventoryList] = useState(initialInventory);
  const [quotations, setQuotations] = useState(initialQuotationRequests);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemSku, setNewItemSku] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemStock, setNewItemStock] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('bags');

  useEffect(() => {
    setActiveTab(currentSubpath === 'overview' ? 'inventory' : currentSubpath);
  }, [currentSubpath]);

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem = {
      id: Date.now(),
      name: newItemName,
      sku: newItemSku || 'SKU-' + Math.floor(Math.random() * 1000),
      stock: Number(newItemStock) || 0,
      unit: newItemUnit,
      price: Number(newItemPrice) || 0,
      status:
        Number(newItemStock) > 100
          ? 'in_stock'
          : Number(newItemStock) > 0
            ? 'low_stock'
            : 'out_of_stock',
    };
    setInventoryList([...inventoryList, newItem]);
    setNewItemName('');
    setNewItemSku('');
    setNewItemPrice('');
    setNewItemStock('');
    setIsAddModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex animate-fade-in flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              Dealer Dashboard
            </h1>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Manage inventory, quotations, orders, and deliveries.
            </p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="btn-primary text-sm">
            <Plus className="h-4 w-4" /> Add Inventory
          </button>
        </div>

        {/* Stats */}
        <div className="animate-delay-100 grid animate-fade-in grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="premium-card group p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-semibold ${stat.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
                  >
                    {stat.change >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Inventory Table */}
        {(activeTab === 'inventory' || currentSubpath === 'overview') && (
          <div className="premium-card animate-delay-200 animate-fade-in overflow-hidden">
            <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
              <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                Inventory Management
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>SKU</th>
                    <th className="text-right">Stock</th>
                    <th>Unit</th>
                    <th className="text-right">Price (₹)</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryList.map((item) => (
                    <tr key={item.id}>
                      <td className="font-medium text-surface-900 dark:text-white">{item.name}</td>
                      <td className="font-mono text-xs text-surface-500">{item.sku}</td>
                      <td className="text-right font-mono">{item.stock.toLocaleString()}</td>
                      <td>{item.unit}</td>
                      <td className="text-right font-mono">{item.price.toLocaleString()}</td>
                      <td>
                        <span
                          className={`badge ${item.status === 'in_stock' ? 'badge-success' : item.status === 'low_stock' ? 'badge-warning' : 'badge-danger'}`}
                        >
                          {item.status === 'in_stock'
                            ? 'In Stock'
                            : item.status === 'low_stock'
                              ? 'Low Stock'
                              : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="text-right">
                        <button
                          onClick={() =>
                            setInventoryList(inventoryList.filter((i) => i.id !== item.id))
                          }
                          className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          ✕ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quotation Requests & Deliveries */}
        {(activeTab === 'requests' || activeTab === 'orders' || activeTab === 'deliveries') && (
          <div className="grid animate-fade-in gap-6 lg:grid-cols-2">
            {/* Quotation Requests */}
            <div className="premium-card">
              <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
                <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                  Quotation Requests
                </h2>
              </div>
              <div className="divide-y divide-surface-100 dark:divide-surface-800/50">
                {quotations.map((req) => (
                  <div
                    key={req.id}
                    className="group p-4 transition-colors hover:bg-surface-50 dark:hover:bg-surface-800/30"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-surface-900 dark:text-white">
                          {req.material}
                        </p>
                        <p className="mt-0.5 text-2xs text-surface-400">
                          {req.id} • {req.qty} • {req.buyer}
                        </p>
                      </div>
                      <span
                        className={`badge ${req.status === 'new' ? 'badge-primary' : req.status === 'quoted' ? 'badge-warning' : 'badge-success'}`}
                      >
                        {req.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-2xs text-surface-500">
                        {req.project} • Due: {req.deadline}
                      </p>
                      {req.status === 'new' && (
                        <button
                          onClick={() =>
                            setQuotations(
                              quotations.map((q) =>
                                q.id === req.id ? { ...q, status: 'quoted' } : q
                              )
                            )
                          }
                          className="btn-primary px-2 py-1 text-2xs"
                        >
                          Send Quote
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliveries */}
            <div className="premium-card">
              <div className="flex items-center justify-between border-b border-surface-200 p-5 dark:border-surface-800">
                <h2 className="text-base font-semibold text-surface-900 dark:text-white">
                  Deliveries
                </h2>
              </div>
              <div className="space-y-3 p-4">
                {deliveries.map((del) => (
                  <div
                    key={del.id}
                    className="rounded-xl border border-surface-200 bg-surface-50 p-3 dark:border-surface-800/50 dark:bg-surface-800/30"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-surface-900 dark:text-white">
                        {del.order}
                      </p>
                      <span
                        className={`badge ${del.status === 'in_transit' ? 'badge-warning' : del.status === 'loading' ? 'badge-primary' : 'badge-info'}`}
                      >
                        {del.status === 'in_transit'
                          ? '🚛 In Transit'
                          : del.status === 'loading'
                            ? '📦 Loading'
                            : '📅 Scheduled'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-2xs text-surface-500">
                      <div>
                        <span className="font-medium">To:</span> {del.destination}
                      </div>
                      <div>
                        <span className="font-medium">ETA:</span> {del.eta}
                      </div>
                      <div>
                        <span className="font-medium">Driver:</span> {del.driver}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
         MODAL: ADD INVENTORY
         ======================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative w-full max-w-md animate-scale-in rounded-xl border border-surface-200 bg-white p-6 shadow-glass-lg dark:border-surface-800 dark:bg-surface-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-surface-900 dark:text-white">
                Add Inventory Stock
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleAddInventory} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                  Material Name
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="OPC Cement 43 Grade"
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={newItemSku}
                    onChange={(e) => setNewItemSku(e.target.value)}
                    placeholder="CEM-043"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                    Price per Unit (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="350"
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                    Starting Stock Qty
                  </label>
                  <input
                    type="number"
                    required
                    value={newItemStock}
                    onChange={(e) => setNewItemStock(e.target.value)}
                    placeholder="500"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                    Unit
                  </label>
                  <select
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="input-field"
                  >
                    <option value="bags">bags</option>
                    <option value="kg">kg</option>
                    <option value="cu.m">cu.m</option>
                    <option value="nos">nos</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
