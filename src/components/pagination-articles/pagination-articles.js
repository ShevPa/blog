import React from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../store/articlesSlice';
import cl from './pagination-articles.module.scss';
const PaginationArticles = () => {
  const dispatch = useDispatch();
  const { pageCount, currentPage } = useSelector((state) => state.articles);
  return (
    <div className={cl.pagination}>
      <Pagination
        defaultCurrent={currentPage}
        total={pageCount * 10}
        showSizeChanger={false}
        onChange={(page) => dispatch(setCurrentPage({ page }))}
      />
    </div>
  );
};
export default PaginationArticles;
