import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  BundleStatus,
  clearBundleAction,
  getBundleSuggestionsAction,
} from "../../redux/action/bundle-action";
import Error from "../layout/error";
import { RotateIcon } from "../layout/icon";

// STYLES
const Container = styled.div`
  width: 650px;
  border: 1px solid #9e9e9e80;
  border-radius: 10px;
`;

const Form = styled.form`
  width: 90%;
  padding: 10px 25px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  border: none;
  width: 100%;
  font-size: xx-large;
  caret-color: rgb(65, 171, 93);
  font-family: inherit;

  &:focus {
    outline: none;
  }
`;

const SuggestionsContainer = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  max-height: 150px;
  overflow: auto;
  background-color: white;
  border: 1px solid #9e9e9e80;
`;

const Suggestion = styled.div`
  background-color: ${(props) => (props.selected ? "#98e9ff" : "transparent")};
`;

const SuggestionName = styled.div`
  font-weight: 600;
  padding: 5px 0px 2px 25px;
  font-size: 12px;
`;

const SuggestionDesc = styled.div`
  font-size: 10px;
  padding: 2px 0px 5px 25px;
  color: gray;
`;

const DivError = styled.div`
  text-align: center;
`;

let lastTimeout;

// COMPONENT
/**
 *
 * Component to seek a bundle. Display an input and autocomplete list with matched bundles.
 * When choosing a bundle, send to result page.
 */
export function BundleSearchAutocomplete(props) {
  const { suggestions, bundle, version, fetching, error } = props;

  const history = useHistory();
  const [inputValue, setInputValue] = useState(
    bundle && version ? `${bundle}@${version}` : ""
  );
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(null);

  // Update on suggestions props
  useEffect(() => {
    setOpen(suggestions.length > 0);
    setSelection(suggestions.length > 0 ? suggestions[0] : null);
  }, [suggestions]);

  // Update on bundle/version input
  useEffect(() => {
    if (bundle && version) {
      setInputValue(bundle + "@" + version);
    }
  }, [bundle, version]);

  // Delay getting suggestions after update input value
  useEffect(() => {
    // Delay getting suggestions
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(() => {
      if (inputValue.length >= 2) {
        props.getBundleSuggestionsAction(inputValue);
      }
    }, 250);
  }, [inputValue]);

  // CALLBACKS
  function onChange(event) {
    const { value } = event.target;

    setInputValue(value);
  }

  function onSelectBundle(name, version) {
    history.push(`/results?bundle=${name}&version=${version}`);
    props.clearBundleAction();
  }

  function onSubmit() {
    if (selection) {
      onSelectBundle(selection.name);
    }
  }

  // RENDER
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <SearchInput
          placeholder="Find a package"
          type="text"
          value={inputValue}
          onChange={onChange}
          onFocus={() => setOpen(true)}
          onBlur={(e) => setOpen(false)}></SearchInput>

        <RotateIcon rotate={fetching}>
          {fetching ? <FiRefreshCw /> : <BsSearch />}
        </RotateIcon>
      </Form>

      <SuggestionsContainer open={open}>
        {suggestions.map((suggestion) => (
          <Suggestion
            selected={selection && selection.name === suggestion.name}
            key={suggestion.name}
            onMouseDown={() =>
              onSelectBundle(suggestion.name, suggestion.version)
            }
            onMouseEnter={() => setSelection(suggestion)}>
            <SuggestionName>{suggestion.name} </SuggestionName>

            <SuggestionDesc>
              <i>{suggestion.description}</i>
            </SuggestionDesc>
          </Suggestion>
        ))}
      </SuggestionsContainer>

      {error ? (
        <DivError>
          <Error message={error}></Error>
        </DivError>
      ) : null}

      {props.children}
    </Container>
  );
}

BundleSearchAutocomplete.propTypes = {
  name: PropTypes.string,
  version: PropTypes.string,
  fetching: PropTypes.bool,
};

BundleSearchAutocomplete.defaultProps = {
  name: "",
  version: "",
  fetching: false,
};

const mapStateToProps = (state, ownProps) => {
  return {
    suggestions: state.suggestions,
    suggestionStatus: state.suggestionStatus,
    error: state.error,
    fetching: state.suggestionStatus === BundleStatus.inProgress,
    ...ownProps,
  };
};

const mapDispatchToProps = {
  getBundleSuggestionsAction,
  clearBundleAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BundleSearchAutocomplete);
