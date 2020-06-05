import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import BundleInfo from "../component/bundle/bundle-info";
import BundleSearchAutocomplete from "../component/bundle/bundle-search-autocomplete";
import BundleSizesChart from "../component/bundle/bundle-sizes-chart";
import BundleSizesInfo from "../component/bundle/bundle-sizes-info";
import CenterContainer from "../component/layout/center-container";
import Homepage from "../component/layout/homepage";
import {
  BundleStatus,
  getBundleDetailsAction,
} from "../redux/action/bundle-action";

// STYLED
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 800px;
`;

const SizeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  & > div {
    margin: 100px 10px;
  }
`;

const ChartContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  transition: all 0.2s ease-in;
`;

/**
 * Result page that displays bundle info (size, name, description...)
 */
function Results(props) {
  const { bundle, version, bundleDetails, bundleStatus } = props;

  useEffect(() => {
    props.getBundleDetailsAction(bundle);
  }, [bundle, version]);

  const hasBundleDetails = bundleDetails && bundleStatus === BundleStatus.ok;

  let bundleSizes = [];
  let lastSize = { initialSize: 0, minifySize: 0, gzipSize: 0 };

  if (hasBundleDetails) {
    bundleSizes = bundleDetails.sizes;

    const lastVersionSize = bundleDetails.sizes.filter(
      (size) => size.version === version
    );

    if (lastVersionSize.length) {
      lastSize = lastVersionSize[0];
    }
    console.log(lastSize);
  }

  return (
    <CenterContainer>
      <Homepage />

      <SubContainer>
        <BundleSearchAutocomplete
          bundle={bundle}
          version={version}
          fetching={bundleStatus === BundleStatus.inProgress}>
          {bundleDetails ? (
            <BundleInfo
              name={bundle}
              description={bundleDetails.description}
              dependencies={bundleDetails.dependencies}
              repository={bundleDetails.repository}
            />
          ) : null}
        </BundleSearchAutocomplete>

        <SizeContainer>
          <BundleSizesInfo size={lastSize} />
          <ChartContainer width={"400px"} height={"400px"}>
            <BundleSizesChart sizes={bundleSizes} />
          </ChartContainer>
        </SizeContainer>
      </SubContainer>
    </CenterContainer>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    bundleDetails: state.bundleDetails,
    bundleStatus: state.bundleStatus,
    error: state.error,
    ...ownProps,
  };
}

const mapDispatchToProps = {
  getBundleDetailsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
