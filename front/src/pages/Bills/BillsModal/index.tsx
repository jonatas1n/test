import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { useBill } from "@/hooks/api/queries/bills/bill";
import { Flex, Grid, GridItem, Separator, Spinner } from "@chakra-ui/react";
import { ProgresBar } from "@/components/ProgressBar";
import { useAppContext } from "@/hooks/context";
import { BillProfile } from "./BillProfile";
import { BillVotes } from "./BillVotes";

export const BillsModal = () => {
  const { selectedBill, clearSelected } = useAppContext();
  const { data: bill, isLoading } = useBill(selectedBill ?? "");
  const { yesVotes, noVotes } = bill ?? {};

  return (
    <DialogRoot
      size="xl"
      placement="center"
      motionPreset="slide-in-bottom"
      open={!!selectedBill}
      closeOnInteractOutside
    >
      <DialogContent>
        <DialogHeader>
          <DialogCloseTrigger onClick={clearSelected} />
        </DialogHeader>
        {!isLoading && bill ? (
          <DialogBody>
            <Grid gap={8}>
              <GridItem>
                <Grid gap={4}>
                  <BillProfile bill={bill} />
                  <ProgresBar yesCount={yesVotes ?? 0} noCount={noVotes ?? 0} />
                </Grid>
              </GridItem>
              <Separator />
              <BillVotes bill={bill} />
            </Grid>
          </DialogBody>
        ) : (
          <Flex>
            <Spinner />
          </Flex>
        )}
      </DialogContent>
    </DialogRoot>
  );
};
