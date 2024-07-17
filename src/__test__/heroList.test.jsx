const { usePathname, useSearchParams, useRouter } = require('next/navigation');
require('@testing-library/jest-dom');
const { render, screen } = require('@testing-library/react');
const { default: userEvent } = require('@testing-library/user-event');
const { HeroList } = require('../components/heroList/HeroList');
const { PagesButtonList } = require('../components/heroList/PagesButtonList');
const heroes = require('./data/heroes.json');

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe('Hero list testing', () => {
  beforeEach(() => {
    useSearchParams.mockReturnValue({
      get: jest.fn(() => '0'),
    });
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it('should render the hero list and list should contain Obi-Wan Kenobi', async () => {
    const handleSelect = jest.fn();
    const handlePageSelect = jest.fn();
    render(
      <HeroList
        heroes={heroes}
        onSelectedHero={handleSelect}
        onPageChange={handlePageSelect}
      />
    );

    const element = screen.getByText(/Obi-Wan Kenobi/i);

    await userEvent.click(element);

    expect(element).toBeInTheDocument();
    expect(handleSelect).toHaveBeenCalled();
    expect(screen.getAllByTestId('heroLine').length).toBe(10);
  });

  it('should render correct page numbers', () => {
    const handlePageSelect = jest.fn();

    render(
      <PagesButtonList
        count={83}
        prev={null}
        next="https://sw-api.starnavi.io/people/?page=2"
        onPageChange={handlePageSelect}
      />
    );

    const buttonList = screen.getByTestId('buttonList');
    expect(buttonList.children.length).toBe(9);

    const prevButton = screen.getByTestId('prevButton');
    expect(prevButton).toHaveProperty('disabled');
    expect(screen.getByText(1)).toBeInTheDocument();
  });
});
