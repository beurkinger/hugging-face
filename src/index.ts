import { v4 as uuid } from 'uuid';
import './index.css';

interface Dropdown {
  buttonElement: HTMLElement;
  dropdownElement: HTMLElement;
  id: string;
  isOpen: boolean;
  menuElement: HTMLElement;
}

let dropdowns: Dropdown[] = [];

// Add a dropdown to the list
const addDropdown = (dropdownElement: HTMLElement) => {
  const id = uuid();
  const isOpen = false;
  const buttonElement = dropdownElement.querySelector<HTMLElement>('.button');
  const menuElement = dropdownElement.querySelector<HTMLElement>('.menu');
  if (!buttonElement || !menuElement) return;

  buttonElement.addEventListener('click', (e) =>
    handleClickDropdownButton(e, id)
  );

  const dropdown = { buttonElement, dropdownElement, id, isOpen, menuElement };
  dropdowns = [...dropdowns, dropdown];
};

const updateDropdownsVisibility = () => {
  dropdowns.forEach((dropdown) => {
    dropdown.menuElement.style.display = dropdown.isOpen ? 'block' : 'none';
  });
};

const handleClickDropdownButton = (e: MouseEvent, id: string) => {
  e.preventDefault();
  e.stopPropagation();
  dropdowns = dropdowns.map((dropdown) => ({
    ...dropdown,
    isOpen: dropdown.id === id && !dropdown.isOpen,
  }));
  updateDropdownsVisibility();
};

const handleClickDocument = () => {
  dropdowns = dropdowns.map((dropdown) => ({ ...dropdown, isOpen: false }));
  updateDropdownsVisibility();
};

document?.addEventListener('DOMContentLoaded', () => {
  const dropdownElements = document.querySelectorAll<HTMLElement>('.dropdown');
  dropdownElements.forEach(addDropdown);
  document.addEventListener('click', handleClickDocument);
});
