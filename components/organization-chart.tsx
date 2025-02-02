'use client';

import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Button } from './ui/button';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';

interface OrgNode {
  id: string;
  name: string;
  title: string;
  children?: OrgNode[];
}

const StyledNode = ({
  node,
  onAdd,
  onEdit,
  onDelete,
}: {
  node: OrgNode;
  onAdd: (parentId: string) => void;
  onEdit: (node: OrgNode) => void;
  onDelete: (nodeId: string) => void;
}) => {
  return (
    <div className="p-4 rounded-lg border-2 border-gray-200 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
          {node.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{node.name}</span>
          <span className="text-sm text-gray-500">{node.title}</span>
        </div>
        <div className="flex gap-2 ml-4">
          <Button variant="ghost" size="icon" onClick={() => onAdd(node.id)}>
            <PlusCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(node)}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(node.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function OrganizationChart() {
  const [orgData, setOrgData] = useState<OrgNode>({
    id: '1',
    name: 'John Doe',
    title: 'CEO',
    children: [],
  });

  const handleAdd = (parentId: string) => {
    // Implementation for adding node

    // Example:
    const newNode = { id: 'new-id', name: 'New Name', title: 'New Title' };
    setOrgData((prevData) => {
      const newData = { ...prevData };
      // Add logic to update newData based on parentId
      return newData;
    });
  };

  const handleEdit = (node: OrgNode) => {
    // Implementation for editing node
  };

  const handleDelete = (nodeId: string) => {
    // Implementation for deleting node
  };

  const renderTree = (node: OrgNode) => (
    <TreeNode
      label={
        <StyledNode
          node={node}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      }
    >
      {node.children?.map((child) => renderTree(child))}
    </TreeNode>
  );

  return (
    <div className="p-8">
      <Tree
        lineWidth={'2px'}
        lineColor={'#22c55e'}
        lineBorderRadius={'10px'}
        label={
          <StyledNode
            node={orgData}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        }
      >
        {orgData.children?.map((child) => renderTree(child))}
      </Tree>
    </div>
  );
}
