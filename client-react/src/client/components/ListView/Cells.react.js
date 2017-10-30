import moment from 'moment';
import filesize from 'filesize';
import SVG from '@opuscapita/react-svg/lib/SVG';
import { SortDirection } from 'react-virtualized';
import { getIcon } from './icons';

let sortASCIcon = require('!!raw-loader!@opuscapita/svg-icons/lib/arrow_drop_down.svg');
let sortDESCIcon = require('!!raw-loader!@opuscapita/svg-icons/lib/arrow_drop_up.svg');

const LoadingCell = () => (
  <div className="oc-fm--list-view__cell oc-fm--list-view__cell--loading">
    <div className="oc-fm--list-view__cell-loading-content">&nbsp;</div>
  </div>
);

export const NameCell = ({ loading }) => ({
  cellData, columnData, columnIndex, dataKey, isScrolling, rowData, rowIndex
}) => {
  if (loading) {
    return (<LoadingCell />);
  }

  let { svg, fill } = getIcon(rowData);
  return (
    <div  className="oc-fm--list-view__cell oc-fm--list-view__name-cell">
      <div className="oc-fm--list-view__name-cell-icon">
        <SVG
          className="oc-fm--list-view__name-cell-icon-image"
          svg={svg}
          style={{ fill }}
        />
      </div>
      <div
        className="oc-fm--list-view__cell oc-fm--list-view__name-cell-title"
        title={cellData || ''}
      >
        {cellData || ''}
      </div>
    </div>
  );
};

export const SizeCell = ({ humanReadableSize, isDirectory, loading }) => {
  return ({ cellData, columnData, columnIndex, dataKey, isScrolling, rowData, rowIndex }) => {
    if (loading) {
      return (<LoadingCell />);
    }

    let formattedSize = (typeof cellData !== 'undefined' && humanReadableSize) ?
      filesize(cellData) :
      (cellData || '');

    return (
      <div className="oc-fm--list-view__cell">
        {formattedSize || '—'}
      </div>
    );
  };
};

export const DateTimeCell = ({ locale, dateTimePattern, loading }) => {
  return ({ cellData, columnData, columnIndex, dataKey, isScrolling, rowData, rowIndex }) => {
    if (loading) {
      return (<LoadingCell />);
    }

    let formattedDateTime = cellData ?
      moment(new Date().setTime(cellData)).locale(locale).format(dateTimePattern) :
      '';

    return (
      <div className="oc-fm--list-view__cell">
        {formattedDateTime}
      </div>
    );
  };
};

export const HeaderCell = ({ loading }) => ({ columnData, dataKey, disableSort, label, sortBy, sortDirection })  => {
  if (loading) {
    return (<LoadingCell />);
  }

  let sortIconSvg = sortDirection === SortDirection.ASC ? sortASCIcon : sortDESCIcon;
  let sortIconElement = dataKey === sortBy ? (
    <SVG svg={sortIconSvg} />
  ) : null;

  return (
    <div className="oc-fm--list-view__header-cell">
      {label}
      {sortIconElement}
    </div>
  );
};