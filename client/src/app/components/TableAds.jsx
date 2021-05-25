import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useHistory, Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import CircularProgress from '@material-ui/core/CircularProgress';

import Moment from 'react-moment';
import {
  startTradeAction,
  secondTradeIdleAction,
  fetchCurrentTradeIdle,
} from '../actions/trade';

function createData(
  username,
  paymentMethod,
  price,
  limit,
  type,
  id,
  currencyName,
  country,
  online,
  openStore,
  lastSeen,
  priceType,
  margin,
  currencyIso,
) {
  return {
    username,
    paymentMethod,
    price,
    limit,
    type,
    id,
    currencyName,
    country,
    online,
    openStore,
    lastSeen,
    priceType,
    margin,
    currencyIso,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    headCells,
    classes,
    onSelectAllClick,
    order, orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells && headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected}
          {' '}
          selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function getPercentageChange(oldNumber, newNumber) {
  const decreaseValue = oldNumber - newNumber;

  return (decreaseValue / oldNumber) * 100;
}
function relDiff(a, b) {
  return 100 * Math.abs((a - b) / ((a + b) / 2));
}

function EnhancedTable(props) {
  const {
    headCells,
    postAd,
    currentTrade,
    price,
    defaultPageSize,
    startTrade,
  } = props;
  const rows = [];
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCurrentTradeIdle());
  }, []);

  useEffect(() => {
    dispatch(secondTradeIdleAction());
  }, []);

  useEffect(() => {
    console.log('currentTrade');
    console.log(currentTrade);
    if (currentTrade.type === 'init') {
      console.log(currentTrade);
      history.push(`/trade/init/${currentTrade.id}`);
    }
  }, [currentTrade]);

  useEffect(() => {
  }, [price]);

  postAd.forEach((item) => {
    console.log('item');
    console.log(item);
    rows.push(
      createData(
        item.user.username,
        item.paymentMethod.name,
        (item.price / 1e8),
        `${item.min / 1e8} - ${item.max / 1e8}`,
        item.type,
        item.id,
        item.currency.currency_name,
        item.country.name,
        item.user.online,
        item.user.open_store,
        item.user.lastSeen,
        item.priceType,
        item.margin,
        item.currency.iso,
      ),
    );
  });

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleClickTrade = (id) => {
    console.log(id);
    dispatch(startTradeAction(id));
    // setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const actualPrice = price && (price.filter((object) => object.currency === row.currencyIso));
                  const theActualPrice = actualPrice.length ? actualPrice[0].price : 0;
                  // const priceChange = -((getPercentageChange(theActualPrice, row.price)).toFixed(0));
                  // $result=(($recent-$previous)/$previous);
                  const priceChange = (((row.price - theActualPrice) / theActualPrice) * 100).toFixed(2);
                  // const priceChange = relDiff(Number(row.price), Number(theActualPrice));
                  console.log(theActualPrice);
                  console.log(row.margin);
                  console.log('3333333333333333333333333')

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <p>
                          <Link style={{ color: 'blue' }} to={`/public_profile/${row.username}`}>
                            {row.username}
                          </Link>
                          {' '}
                          <FiberManualRecordIcon
                            fontSize="small"
                            style={{
                              color: row.online ? 'green' : 'red',
                            }}
                          />
                          {' '}
                          <ShoppingCartIcon
                            fontSize="small"
                            style={{
                              color: row.openStore ? 'green' : 'red',
                            }}
                          />
                        </p>
                        <p>
                          last seen:
                          {' '}
                          {row.lastSeen !== null ? (<Moment interval={1000} fromNow>{row.lastSeen}</Moment>) : 'never'}
                        </p>

                      </TableCell>
                      <TableCell align="right">{row.country}</TableCell>
                      <TableCell align="right">{row.paymentMethod}</TableCell>
                      <TableCell
                        align="right"
                      >
                        {priceChange > 0 ? (<span style={{ color: 'red' }}><TrendingUpIcon /></span>) : (<span style={{ color: 'green' }}><TrendingDownIcon /></span>)}
                        {' '}
                        {row.priceType === 'static' && row.price}
                        {row.priceType === 'margin' && (((theActualPrice / 100) * (row.margin / 1e2)).toFixed(8))}

                        {' '}
                        (
                        {row.priceType}
                        )
                      </TableCell>
                      <TableCell align="right">
                        {row.currencyName}
                      </TableCell>
                      {/* <TableCell align="right">
                        {priceChange > 0 ? (
                          <span style={{ color: 'red' }}>
                            <TrendingUpIcon />
                            {' '}
                            {priceChange}
                            {' '}
                            %
                          </span>
                        ) : (
                          <span style={{ color: 'green' }}>
                            <TrendingDownIcon />
                            {' '}
                            {priceChange}
                            {' '}
                            %
                          </span>
                        )}
                        </TableCell> */}
                      <TableCell align="right">{row.limit}</TableCell>
                      <TableCell align="right">
                        {
                          startTrade.isFetching && (
                            <CircularProgress />
                          )
                        }
                        {row.type === 'buy' && !startTrade.isFetching && (
                        <Button
                          onClick={() => handleClickTrade(row.id)}
                          variant="contained"
                          color="primary"
                        >
                          SELL
                        </Button>
                        )}

                        {row.type === 'sell' && !startTrade.isFetching && (
                        <Button
                          onClick={() => handleClickTrade(row.id)}
                          variant="contained"
                          color="primary"
                        >
                          BUY
                        </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentTrade: state.currentTrade.data,
    price: state.price.data,
    startTrade: state.startTrade,
  }
}

// export default AlertDialogSlide;

export default connect(mapStateToProps, null)(EnhancedTable);
