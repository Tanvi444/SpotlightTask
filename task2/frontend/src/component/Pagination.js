import React from 'react';

const Pagination = ({ rowsPerPage, totalRows, paginate , currentPage, managerId}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
      {currentPage!==1 &&<li onClick={()=> paginate( currentPage-1)} href='!#' className='next' >Previous</li>}
        {pageNumbers.map(number => (
            
          <li key={number} className='page-item'>
            
            <a onClick={() => paginate(number)}  className={ currentPage===number?'page-link backblue':'page-link' }>
              {number}
            </a>
          </li>
          
        ))}
        
        { (currentPage!==pageNumbers[pageNumbers.length-1] && managerId) &&<li onClick={()=> paginate(currentPage+1)} href='!#' className={ 'next'}>Next</li>
}
      </ul>
    </nav>
  );
};

export default Pagination;