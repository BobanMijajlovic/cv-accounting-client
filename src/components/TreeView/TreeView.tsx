import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckSquare, faChevronDown, faChevronRight, faMinusSquare, faPlusSquare} from '@fortawesome/free-solid-svg-icons'
import {faSquare} from '@fortawesome/free-regular-svg-icons'
import CheckboxTree from 'react-checkbox-tree'
import {merge as _merge} from 'lodash'

interface INode {
  label: React.ReactNode;
  value: string;
  children?: Array<Node>;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  showCheckbox?: boolean;
  title?: string;
}

interface IIcons {
  check?: React.ReactNode;
  uncheck?: React.ReactNode;
  halfCheck?: React.ReactNode;
  expandOpen?: React.ReactNode;
  expandClose?: React.ReactNode;
  expandAll?: React.ReactNode;
  collapseAll?: React.ReactNode;
  parentClose?: React.ReactNode;
  parentOpen?: React.ReactNode;
  leaf?: React.ReactNode;
}

interface ITreeViewProps {
  nodes: Array<INode>;
  checkModel?: string;
  checked?: Array<string>;
  disabled?: boolean;
  expandDisabled?: boolean;
  expandOnClick?: boolean;
  expanded?: Array<string>;
  icons?: IIcons;
  iconsClass?: string;
  id?: string;
  name?: string;
  nameAsArray?: boolean;
  nativeCheckboxes?: boolean;
  noCascade?: boolean;
  onlyLeafCheckboxes?: boolean;
  optimisticToggle?: boolean;
  showExpandAll?: boolean;
  showNodeIcon?: boolean;
  showNodeTitles?: boolean;
  onCheck?: (checked: Array<string>) => void;
  onClick?: (event: { checked: boolean, value: any }) => void;
  onExpand?: (expanded: Array<string>) => void;

}

const TreeView = ({nodes, checked, expanded, onCheck, onExpand, onClick, icons, noCascade = true, optimisticToggle = true, showExpandAll = false, nativeCheckboxes = true}: ITreeViewProps) => {

  const _icons = _merge(icons, {
    check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon={faCheckSquare}/>,
    uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={faSquare}/>,
    halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon={faCheckSquare}/>,
    expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon={faChevronRight}/>,
    expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon={faChevronDown}/>,
    expandAll: <span>Expanded All <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon={faPlusSquare}/></span>,
    collapseAll: <span> Collapse All <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon={faMinusSquare}/> </span>
  })

  return (
    <CheckboxTree
            nodes={nodes as any}
            checked={checked}
            expanded={expanded}
            noCascade={noCascade}
            showExpandAll={showExpandAll}
            optimisticToggle={optimisticToggle}
            onCheck={onCheck}
            onClick={onClick}
            onExpand={onExpand}
            iconsClass={'fa5'}
            nativeCheckboxes={nativeCheckboxes}
            icons={_icons}
    />
  )
}

export default TreeView