import React from 'react';
import { commonCardStyles, cardSectionStyles } from './styles';

/**
 * Sections for the <Card> component; adds separators between sections. Should be placed inside <Card.Content>
 */
const CardSection: React.SFC = ({ children }) => (
  <div className="Card__Section Card__Padding">
    <style jsx>{commonCardStyles}</style>
    <style jsx>{cardSectionStyles}</style>
    {children}
  </div>
);

export default CardSection;
