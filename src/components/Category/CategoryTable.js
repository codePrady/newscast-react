import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchArticles } from '../../actions/newsActions';
import CategoryRow from './CategoryRow';
import WebsiteRow from '../Websites/WebsiteRow';

const CategoryTable = ({ categories }) => {
  const rows = [];
  let lastCategory = null;

  categories.forEach(category => {
    if (category.categoryName !== lastCategory) {
      rows.push(
        <CategoryRow
          categoryName={category.categoryName}
          key={category.categoryName}
        />
      );
    }
    rows.push(
      <WebsiteRow
        websiteName={category.websiteName}
        websiteURL={category.websiteURL}
        key={category.websiteName}
        onWebsiteClick={() => fetchArticles(category.websiteURL)}
      />
    );
    lastCategory = category.categoryName;
  });

  return (
    <div class='newscategory'>
      <table class='categorytable'>
        <thead>
          <tr>
            <th>Pick Your News</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

CategoryTable.propTypes = {
  categories: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(
  mapStateToProps,
  { fetchArticles }
)(CategoryTable);
